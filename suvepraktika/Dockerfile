FROM gradle:8.7-jdk21-alpine AS build

WORKDIR /app

COPY build.gradle ./

COPY settings.gradle ./

COPY gradle gradle

RUN gradle build --no-daemon || true

COPY . .

RUN gradle bootJar --no-daemon

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
