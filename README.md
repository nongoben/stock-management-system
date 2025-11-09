1. run => docker build -t stock-management-system .
2. run => docker run -d -p 8080:80 --restart always stock-management-system

# Push to Docker Hub

5. run => docker login
6. run => docker tag stock-management-system nongoben331/stock-system:stock
7. run => docker push nongoben331/stock-system:stock
