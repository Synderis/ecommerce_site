# Use an official Python image as a base
FROM public.ecr.aws/docker/library/python:3.12-slim

# Set the working directory to /app
WORKDIR /var/task

COPY assets /var/task/assets

# Copy the requirements file
COPY requirements.txt .

# Install the dependencies
RUN python -m pip install --no-cache-dir --upgrade pip && \
    python -m pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Expose the port that the application will run on
EXPOSE 8000

# Run the command to start the application when the container starts
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]