from fastapi import HTTPException, status


class ResponseHandler:
    @staticmethod
    def success(message, data=None):
        return {"message": message, "data": data}

    @staticmethod
    def get_single_success(name, id, data):
        message = f"Details for {name} with id {id}"
        return ResponseHandler.success(message, data)

    @staticmethod
    def create_success(name, id, data):
        message = f"{name} with id {id} created successfully"
        return ResponseHandler.success(message, data)
    
    @staticmethod
    def create_failure(data,error):
        if 'users_email_key' in error:
            message = "Email already exists"
        elif 'users_username_key' in error:
            message = "Username already exists"
        else:
            message = f"Error creating account"
        raise HTTPException(status_code=400, detail=message)

    @staticmethod
    def update_success(name, id, data):
        message = f"{name} with id {id} updated successfully"
        return ResponseHandler.success(message, data)

    @staticmethod
    def delete_success(name, id, data):
        message = f"{name} with id {id} deleted successfully"
        return ResponseHandler.success(message, data)
    
    @staticmethod
    def login_success(name, id, data):
        message = f"{name} with id {id} logged in successfully"
        return ResponseHandler.success(message, data)

    @staticmethod
    def not_found_error(name="", id=None):
        message = f"{name} With Id {id} Not Found!"
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=message)

    @staticmethod
    def invalid_token(name=""):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid {name} token.",
            headers={"WWW-Authenticate": "Bearer"})

    @staticmethod
    def blacklisted_token(token, code):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"{code} with token for {token}",)