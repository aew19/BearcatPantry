package test.test;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.*;
import org.springframework.web.bind.annotation.*;



//HOW TO RUN AND SET UP SERVER
//go into terminal and run mvn clean spring-boot:run
@RestController
public class app {

    public static Statement generateConnectionStatement(){
        Statement stmt = null;
        String connectionUrl = "jdbc:sqlserver://localhost:1433;databaseName=PantryTest;user=sa;password=Testing123";
        try {
            // Load SQL Server JDBC driver and establish connection.
            System.out.print("Connecting to SQL Server ... ");
            try (Connection conn = DriverManager.getConnection(connectionUrl)) {
                System.out.println("Connected!");
                stmt = conn.createStatement();
            }
        } catch (Exception e) {
            System.out.println();
            e.printStackTrace();
        }
        return stmt;
    }

    @GetMapping("/barcodes")
    List<String> all(){
        List<String> Barcodes = new ArrayList<String>();
        String connectionUrl = "jdbc:sqlserver://localhost:1433;databaseName=PantryTest;user=sa;password=Testing123";
        try {
            Connection conn = DriverManager.getConnection(connectionUrl);
            Statement stmt = conn.createStatement();
            ResultSet rs;

            rs = stmt.executeQuery("SELECT BarcodeID from Inventory");
            while ( rs.next() ) {
                String barcodeId = rs.getString("BarcodeID");
                Barcodes.add(barcodeId);
            }
            conn.close();
        } catch (Exception e) {
            System.err.println("Got an exception! ");
            System.err.println(e.getMessage());
        }
        return Barcodes;
    }

    @PostMapping("/newBarcode")
    void newBarcode(@RequestBody String barcode){
        String connectionUrl = "jdbc:sqlserver://localhost:1433;databaseName=PantryTest;user=sa;password=Testing123";
        try {
            System.out.println(barcode);
            Connection conn = DriverManager.getConnection(connectionUrl);
            Statement stmt = conn.createStatement();
            String testBC = barcode.trim();
            testBC = testBC.replace("\n","").replace("\r","");
            String sqlquery = "INSERT INTO Inventory (BarcodeID) VALUES (" + testBC + ")";
            stmt.executeUpdate(sqlquery);
            conn.close();
        } catch (Exception e) {
            System.err.println("Got an exception!");
            System.err.println(e.getMessage());
        }
    }
}
