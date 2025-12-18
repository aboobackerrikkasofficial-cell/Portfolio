from flask import Flask, request
from flask_cors import CORS
from flask_mail import Mail, Message
from dotenv import load_dotenv
from markupsafe import escape
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')
app.config['MAIL_TIMEOUT'] = 30


mail = Mail(app)

@app.route('/health')
def health():
    return "OK", 200

@app.route('/')
def home():
    return "Portfolio Backend is Running ✅"

@app.route('/test-mail')
def test_mail():
    if not app.config['MAIL_DEFAULT_SENDER']:
        return "MAIL_DEFAULT_SENDER not configured", 500
    
    msg = Message(
        subject="Test Email",
        recipients=[app.config['MAIL_DEFAULT_SENDER']],
        body="Flask Mail is working!"
    )
    mail.send(msg)
    return "Mail Sent Successfully!"

@app.route('/submit', methods=['GET','POST'])
def submit():
    if request.method == 'GET':
        return 'Method not allowed',405
    
    try:
        if not app.config['MAIL_DEFAULT_SENDER']:
            return "MAIL_DEFAULT_SENDER not configured", 500
    
        data = request.form

        fullname = escape(data.get('fullname', ''))
        email = escape(data.get('email', ''))
        mobile = escape(data.get('mobile', ''))
        subject = escape(data.get('emailsubject', ''))
        message = escape(data.get('message', ''))
        user_email=data.get('email', '')
        
        if '\n' in user_email or '\r' in user_email:
            return "Invalid email",400
        
        msg = Message(
            subject=f" Portfolio Contact — {subject}",
            recipients=[app.config['MAIL_DEFAULT_SENDER']],
            reply_to=user_email
        )
        msg.html = f"""
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
            <style>
                body {{
                    background-color: #0b0b0b;
                    font-family: Arial, sans-serif;
                    color: #ffffff;
                    padding: 20px;
                }}
                .container {{
                    max-width: 600px;
                    margin: auto;
                    background: #111111;
                    border-radius: 12px;
                    padding: 25px;
                    border: 1px solid #00b7ff;
                }}
                h2 {{
                    color: #00b7ff;
                    text-align: center;
                    margin-bottom: 20px;
                }}
                .row {{
                    
                }}
                .label {{
                    color: #888;
                    font-size: 14px;
                }}
                .value {{
                    font-size: 16px;
                    margin-top: 2px;
                }}
                .message-box {{
                    margin-top: 20px;
                    padding: 15px;
                    background: #000;
                    border-radius: 8px;
                    border-left: 4px solid #00b7ff;
                    white-space: pre-wrap;
                }}
                .footer {{
                    margin-top: 25px;
                    text-align: center;
                    font-size: 12px;
                    color: #777;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <h2>📩 New Contact Message</h2>

                <div class="row">
                <div class="label">Full Name</div>
                <div class="value">{fullname}</div>
                </div>

                <div class="row">
                <div class="label">Email</div>
                <div class="value">{email}</div>
                </div>

                <div class="row">
                <div class="label">Mobile</div>
                <div class="value">{mobile}</div>
                </div>

                <div class="row">
                <div class="label">Subject</div>
                <div class="value">{subject}</div>
                </div>

                <div class="message-box">
                {message}
                </div>

                <div class="footer">
                This message was sent from your portfolio contact form.
                </div>
            </div>
        </body>
        </html>
        """

        mail.send(msg)
        success = True

    except Exception as e:
        print("Mail error:", e)
        success = False

    return f""", 200 if success else 500
    <html>
    <head>
        <style>
            body {{
                background: #000000;
            }}
            .custom-alert {{
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #000000;
                border: 3px solid {('#00b7ff' if success else '#ff0000')};
                color: white;
                padding: 20px 30px;
                border-radius: 12px;
                box-shadow: 0 0 15px {'#00b7ff' if success else '#ff0000'};
                font-size: 18px;
                z-index: 9999;
                animation: fadeIn 0.5s ease;
                font-family: 'Poppins', sans-serif;
                max-width: 90vw;
                width: 30%;
                text-align: center;
            }}
            @keyframes fadeIn {{
                from {{opacity: 0;}}
                to {{opacity: 1;}}
            }}
            @media only screen and (max-width:500px) {{
                .custom-alert {{
                    font-size: 18px;
                    padding: 40px 20px;
                    width: 70vw;
                    height: auto;
                }}
            }}
            @media only screen and (min-width:768px) and (max-width:1024px) {{
                .custom-alert {{
                    font-size: 22px;
                    padding: 20px;
                    width: 60vw;
                }}
            }}
        </style>
    </head>
    <body>
        <div class="custom-alert">
            {"Message Sent Successfully!" if success else "Failed to Send Message. Try Again!"}
        </div>
        <script>
            setTimeout(() => {{
                window.location.href = https://your-frontend.vercel.app/#contact';
            }}, 4000);
        </script>
    </body>
    </html>
    """

if __name__ == '__main__':
    app.run()
