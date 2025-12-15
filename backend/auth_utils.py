from passlib.context import CryptContext
import random

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
otp_store = {}

def hash_password(password):
    return pwd_context.hash(password)

def verify_password(password, hashed):
    return pwd_context.verify(password, hashed)

def generate_otp(email):
    otp = random.randint(100000, 999999)
    otp_store[email] = otp
    return otp

def verify_otp(email, otp):
    return otp_store.get(email) == otp
