package com.bcpstockerapp.bcp.controller;

import java.io.IOException;
import java.io.PrintWriter;
import org.json.simple.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/ShibbolethData")
public class MFSP extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
    {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String[] shib_attributes = {
            "persistent-id","displayName","givenName",
            "sn","eppn", "uceduUCID", "mail",
            "affiliation","entitlement"
        };
        
        JSONObject obj = new JSONObject();
        for (int i=0; i<shib_attributes.length; i++)
        {
            obj.put(shib_attributes[i], request.getAttribute(shib_attributes[i]));
        }

        PrintWriter out = response.getWriter();
        out.print(obj);
        out.flush();
    }
}
