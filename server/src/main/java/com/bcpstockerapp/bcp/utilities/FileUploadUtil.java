package com.bcpstockerapp.bcp.utilities;

import java.io.*;
import java.nio.file.*;

import org.springframework.web.multipart.MultipartFile;

public class FileUploadUtil {
    public static void saveFile(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException {

        String os = System.getProperty("os.name").toLowerCase();
        Path uploadPath;
        if (os.contains("windows")){
            uploadPath = Paths.get(uploadDir);
        }else{
            uploadPath = Paths.get("/usr/local/tomcat9/webapps/BearcatPantry/"+uploadDir);
        }


        if (!Files.exists(uploadPath)) {
            File photos = new File(uploadDir);
            photos.mkdirs();
           // Files.createDirectories(uploadPath);
        }

        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ioe) {
            throw new IOException("Could not save image file: " + fileName, ioe);
        }
    }
}
