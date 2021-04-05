package surfnet.tutorials.mfsp;
 
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
 
 
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
public class MFSP extends HttpServlet {
 
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
    {
        /*
        * Get the value of form parameter
        */
        //String name = request.getParameter("name");
        //String welcomeMessage = "Welcome "+name;
        /*
        * Set the content type(MIME Type) of the response.
        */
        response.setContentType("text/html");
    
        PrintWriter out = response.getWriter();
        /*
        * Write the HTML to the response
        */
        out.println("<html>");
        out.println("<head>");
        out.println("<title>My First SP</title>");
        out.println("</head>");
        out.println("<body>");
        out.println("<h1>My First SP</h1>");
        out.println("<p>Hello World!</p>");
    
        /* names of the SAML attributes to display */
        String[] shib_attributes = {
            "persistent-id","Shib-displayName","Shib-givenName","Shib-uceduUCID",
            "Shib-mail","Shib-sn","Shib-eppn",
            "Shib-affiliation","Shib-entitlement"
        };
    
        out.println("<h2>SAML attributes</h2>");
        out.println("<table>");
        for (int i=0; i<shib_attributes.length; i++)
        {
            out.print("<tr><td>"+shib_attributes[i]+"</td>");
            out.print("<td>"+request.getAttribute(shib_attributes[i])+"</td></tr>\n");
        }
        out.println("</table>");
    
        /* also print generic attributes
        * NOTE: this will nog display the SAML attributes, because for some
        * reason these are not included in request.getAttributeNames()
        */
        out.println("<h2>Attributes:</h2>");
        out.println("<table>");
        Enumeration attributes = request.getAttributeNames();
        while ( attributes.hasMoreElements() )
        {
            String attr_name = (String) attributes.nextElement();
            Object attr_val  = request.getAttribute(attr_name);
    
            out.print("<tr><td>"+attr_name+"</td>");
            out.print("<td>"+attr_val+"</td></tr>\n");
        }
        out.println("</table>");
    
    }
 
}