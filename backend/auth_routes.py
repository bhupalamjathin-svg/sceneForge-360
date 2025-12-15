from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from .database import SessionLocal
from .models import User
from .validators import is_valid_gmail, is_strong_password
from .auth_utils import hash_password, verify_password, generate_otp, verify_otp
from .email_utils import send_email

router = APIRouter(prefix="/auth", tags=["Authentication"])


# ---------- DATABASE DEPENDENCY ----------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------- REQUEST SCHEMAS ----------
class SignupRequest(BaseModel):
    username: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    otp: int
    new_password: str


# ---------- SIGNUP ----------
@router.post("/signup")
def signup(data: SignupRequest, db: Session = Depends(get_db)):

    if not is_valid_gmail(data.email):
        raise HTTPException(
            status_code=400,
            detail="Only Gmail addresses (@gmail.com) are allowed"
        )

    if not is_strong_password(data.password):
        raise HTTPException(
            status_code=400,
            detail=(
                "Password must be at least 8 characters long, "
                "include an uppercase letter, a number, and a special character"
            )
        )

    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    user = User(
        username=data.username,
        email=data.email,
        password=hash_password(data.password)
    )

    db.add(user)
    db.commit()

    html_email = f"""
    <div style="
        font-family: 'Segoe UI', sans-serif;
        background: linear-gradient(135deg,#0b0f1a,#1a1f2a);
        color:#fff;
        padding:30px;
        border-radius:20px;
        text-align:center;
    ">
        <h1 style="color:#0ff; text-shadow:0 0 15px #0ff;">🚀 Welcome {user.username}!</h1>
        <p style="font-size:16px;">
            Your SceneForge portal is ready. Imagine, create, and launch cinematic AI scenes into your universe!
        </p>

        <p style="text-align:center; margin-top:30px;">
            <a href="http://localhost:3000/login"
               style="
                   display:inline-block;
                   text-decoration:none;
                   background: linear-gradient(90deg, #0ff, #6cfcff);
                   color:#0b0f1a;
                   padding:15px 30px;
                   border-radius:25px;
                   font-weight:bold;
                   font-size:16px;
                   box-shadow: 0 5px 15px rgba(0,255,255,0.4);
               ">
               Enter SceneForge
            </a>
        </p>

        <p style="font-size:12px; color:#aaa; margin-top:20px;">
            If you did not register, please secure your SceneForge account immediately.
        </p>
    </div>
    """

    send_email(data.email, "🌌 Welcome to SceneForge 360!", html_email)

    return {"message": "Signup successful 🎉"}


# ---------- LOGIN ----------
@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == data.email).first()

    if not user or not verify_password(data.password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    html_email = f"""
    <div style="
        font-family: 'Segoe UI', sans-serif;
        background: linear-gradient(135deg,#0b0f1a,#1a1f2a);
        color:#fff;
        padding:30px;
        border-radius:20px;
    ">
        <h1 style="color:#0ff;">🚀 Hello {user.username}!</h1>
        <p style="font-size:16px;">
            You’ve successfully logged in to SceneForge.
            The engines are primed and your creativity is cleared for launch.
        </p>

        <ul style="list-style:none; padding-left:0; font-size:14px;">
            <li>✨ Explore new scene templates</li>
            <li>🎨 Fine-tune cinematic visuals</li>
            <li>🛰️ Save & share your creations</li>
        </ul>

        <p style="text-align:center; margin-top:30px;">
            <a href="http://localhost:3000/login"
               style="
                   display:inline-block;
                   text-decoration:none;
                   background: linear-gradient(90deg, #0ff, #6cfcff);
                   color:#0b0f1a;
                   padding:15px 30px;
                   border-radius:25px;
                   font-weight:bold;
                   font-size:16px;
                   box-shadow: 0 5px 15px rgba(0,255,255,0.4);
               ">
               🚀 Launch SceneForge
            </a>
        </p>

        <p style="font-size:12px; color:#aaa; margin-top:20px;">
            If this wasn’t you, please reset your password immediately.
        </p>
    </div>
    """

    send_email(data.email, "🌌 Welcome back to SceneForge 360!", html_email)

    return {
        "message": "Login successful",
        "username": user.username
    }


# ---------- FORGOT PASSWORD ----------
@router.post("/forgot-password")
def forgot_password(data: ForgotPasswordRequest, db: Session = Depends(get_db)):

    if not is_valid_gmail(data.email):
        raise HTTPException(
            status_code=400,
            detail="Please enter a valid Gmail address"
        )

    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="Email not registered"
        )

    otp = generate_otp(data.email)

    html_email = f"""
    <div style="
        font-family: 'Segoe UI', sans-serif;
        background: linear-gradient(135deg,#0b0f1a,#1a1f2a);
        color:#fff;
        padding:30px;
        border-radius:20px;
        text-align:center;
    ">
        <h1 style="color:#0ff;">🔐 Password Reset OTP</h1>
        <p style="font-size:16px;">Hi {user.username},</p>
        <p style="font-size:16px;">Use this OTP to reset your password:</p>
        <p style="font-size:24px; font-weight:bold;">{otp}</p>
        <p style="font-size:12px; color:#aaa;">
            If you didn’t request this, ignore this email.
        </p>
    </div>
    """

    send_email(data.email, "SceneForge Password Reset OTP 🔐", html_email)

    return {"message": "OTP sent to your Gmail"}


# ---------- RESET PASSWORD ----------
@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest, db: Session = Depends(get_db)):

    if not is_strong_password(data.new_password):
        raise HTTPException(
            status_code=400,
            detail=(
                "Password must contain an uppercase letter, "
                "a number, and a special character"
            )
        )

    if not verify_otp(data.email, data.otp):
        raise HTTPException(
            status_code=401,
            detail="Invalid OTP"
        )

    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.password = hash_password(data.new_password)
    db.commit()

    html_email = f"""
    <div style="
        font-family: 'Segoe UI', sans-serif;
        background: linear-gradient(135deg,#0b0f1a,#1a1f2a);
        color:#fff;
        padding:30px;
        border-radius:20px;
        text-align:center;
    ">
        <h1 style="color:#0ff;">✅ Password Reset Successful</h1>
        <p style="font-size:16px;">Hi {user.username},</p>
        <p style="font-size:16px;">
            Your SceneForge password has been updated successfully.
        </p>
    </div>
    """

    send_email(data.email, "SceneForge Password Reset Successful ✅", html_email)

    return {"message": "Password reset successful 🔁"}
