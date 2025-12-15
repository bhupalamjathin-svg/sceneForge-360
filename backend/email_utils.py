# backend/email_utils.py
import smtplib
from email.message import EmailMessage

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = "sceneforge360.ai@gmail.com"       # your Gmail
EMAIL_PASSWORD = "arfq cllh epwo uzvs"   # use App Password, not normal Gmail password

def send_email(to_email: str, subject: str, html_content: str):
    msg = EmailMessage()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = to_email
    msg["Subject"] = subject

    # Plain text fallback
    msg.set_content("Please view this email in an HTML-compatible email client.")

    # HTML content
    msg.add_alternative(html_content, subtype="html")

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)
