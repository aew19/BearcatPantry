package com.bcpstockerapp.bcp.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/ShibbolethData")
public class MFSP extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
    {

        response.setContentType("text/html");

        PrintWriter out = response.getWriter();
        out.println("<html>");
        out.println("<body>");

        String[] shib_attributes = {
            "persistent-id","displayName","givenName",
            "sn","eppn", "uceduUCID", "mail",
            "affiliation","entitlement"
        };
        
        out.println("<table>");
        for (int i=0; i<shib_attributes.length; i++)
        {
            out.print("<tr><td>"+shib_attributes[i]+"</td>");
            out.print("<td>"+request.getAttribute(shib_attributes[i])+"</td></tr>\n");
        }

        out.println("</table>");
    }

}
