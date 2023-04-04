# base image
FROM python:3.9.16

# set the working directory in the container
WORKDIR /app

# copy the Flask app code to the container
COPY . /app

# install necessary packages
RUN pip install --no-cache-dir -r requirements.txt
# install flask-cors package
RUN pip install flask-cors

# set environment variables
ENV FLASK_APP=recommend
ENV FLASK_RUN_PORT=4000

# expose the port that Flask will run on
EXPOSE 4000

# run the Flask app
CMD [ "flask", "run", "--host=0.0.0.0", "--port=4000" ]