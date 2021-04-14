package com.bcpstockerapp.bcp.gmail.api;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendEmail {

    public static void SendEmail(String email,String subject,String body) {

        Properties props = System.getProperties();
        props.put("mail.smtp.host", "smtp.uc.edu");
        Session session = Session.getInstance(props, null);
        EmailUtil.sendEmail(session, email, subject, body);

    }
}