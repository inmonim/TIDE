FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY build/libs/user-2.0.jar ApiUser.jar
ENTRYPOINT ["java","-jar","ApiUser.jar"]
