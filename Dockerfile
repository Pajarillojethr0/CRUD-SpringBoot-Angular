FROM maven:3-openjdk-17 AS build
COPY ..
RUN mvn clean package -DskipTests

FROM openjdk:17-slim
COPY --from=build /target/CRUD-0.0.1-SNAPSHOT.jar CRUD.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","CRUD.jar"]