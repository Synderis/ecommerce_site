from pydantic import RootModel
from typing import Dict, Any

class Query(RootModel[Dict[str, Any]]):
    pass
