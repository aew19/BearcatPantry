## How to build backend:
1. mvn spring-boot:run

### Example curl command for testing and api endpoint:
curl localhost:8080/items -d barcode=1234 -d name=Corn -d quantity=5 -d type=vegetable -d brand=Kroger
