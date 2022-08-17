import email
import smtplib
import ssl
import glob

from pathlib import Path
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

sender_email = input("Email: ")
password = input("Password: ")


def create_email_test(receiver_email: str, filename: str) -> str:
    subject = "🚧 VPN: Обновление сервера (авто-рассылка х2)"
    body = """Привет,
Я перенес VPN сервер, который поднимал, на этот раз сделал рассылку автоматически.
К Email прикреплен профиль OpenVPN, нужно открыть его и все должно работать. Если что пишите 🙂

Можно не бояться им пользоваться, у него нет лимита по трафику.
Но торренты через него тоже не стоит качать всю ночь, CPU шарится между всем и скорость у других может упасть.

P.S.
Если честно, я думал что им никто не пользуется, потому что статистика облака говорила, что нагрузка около нуля 😅
Сейчас надеюсь, что скрипт отработал и до всех дойдет, кто ждал 😄👍
Части не дошло просто в прошлый раз...

Удачи,
Сергей 🤖
"""

    # Create a multipart message and set headers
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    # Add body to email
    message.attach(MIMEText(body, "plain"))

    # Open file in binary mode
    with open(filename, "rb") as attachment:
        # Add file as application/octet-stream
        # Email client can usually download this automatically as attachment
        part = MIMEBase("application", "octet-stream")
        part.set_payload(attachment.read())

    # Encode file in ASCII characters to send by email
    encoders.encode_base64(part)

    # Add header as key/value pair to attachment part
    part.add_header(
        "Content-Disposition",
        f"attachment; filename= {Path(filename).name}",
    )

    # Add attachment to message and convert message to string
    message.attach(part)
    return message.as_string()


receiver_list = []
for filename in glob.glob("./zipfiles/**.zip"):
    name = Path(filename).name
    print(name)
    username = name.removeprefix("v4scale_").removesuffix(".zip")
    user_email = f"{username}@v4scale.com"

    receiver_list.append({
        "email": user_email,
        "file": filename,
    })

print(f"[INFO] {len(receiver_list)=}")

for r in receiver_list:
    e = r["email"]
    f = r["file"]
    print(f"[INFO] sendmail to {e}, {f}")

    # Log in to server using secure context and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("mail.v4scale.com", 465, context=context) as server:
        print("[INFO] SMTP_SSL")
        server.login(sender_email, password)
        print("[INFO] login")

        text = create_email_test(e, f)
        server.sendmail(sender_email, e, text)

print("[INFO] done")
