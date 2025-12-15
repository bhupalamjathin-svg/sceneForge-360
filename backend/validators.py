import re

def is_valid_gmail(email: str) -> bool:
    return re.match(r'^[a-zA-Z0-9._%+-]+@gmail\.com$', email)

def is_strong_password(password: str) -> bool:
    return (
        len(password) >= 8 and
        re.search(r"[A-Z]", password) and
        re.search(r"[0-9]", password) and
        re.search(r"[!@#$%^&*]", password)
    )
