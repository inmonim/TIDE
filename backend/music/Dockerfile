FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY build/libs/music-1.0.jar ApiMusic.jar
ENTRYPOINT ["java","-jar","ApiMusic.jar"]
