FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY build/libs/diary-1.0.jar ApiDiary.jar
ENTRYPOINT ["java","-jar","ApiDiary.jar"]
