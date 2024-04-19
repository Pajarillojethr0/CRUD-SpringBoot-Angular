FROM maven:3-openjdk-17 AS build
COPY . /app
RUN mvn clean package -DskipTests && \
    rm -rf target

FROM openjdk:17-slim
COPY --from=build /app/target/CRUD-0.0.1-SNAPSHOT.jar CRUD.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","CRUD.jar"]
