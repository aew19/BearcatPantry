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

        // Add sender
        String from = "BearcatsPantry@ucmail.uc.edu";

        String host = "smtp.uc.edu";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true"); 
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", "587");
        
        // Get the Session object
        Session session = Session.getInstance(props);

        try {
            // Create a default MimeMessage object
            Message message = new MimeMessage(session);
            
            message.setFrom(new InternetAddress(from));
            // message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email + ",BearcatsPantry@ucmail.uc.edu")); uncomment out later
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email)); 
            // Set Reply to
            message.setReplyTo(new InternetAddress[]{new InternetAddress(from)});

            // Set Subject
            message.setSubject(subject);
            
            // Put the content of your message
            message.setText(body);

            // Send message
            Transport.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}