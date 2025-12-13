from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    
    # Check for cycles (DAG check)
    adj_list = {node['id']: [] for node in pipeline.nodes}
    for edge in pipeline.edges:
        # Edge source/target formats might vary in ReactFlow, simplified generic access
        source = edge.get('source')
        target = edge.get('target')
        if source in adj_list:
            adj_list[source].append(target)
    
    visit = set()
    path = set()
    
    def has_cycle(node):
        visit.add(node)
        path.add(node)
        
        for neighbor in adj_list.get(node, []):
            if neighbor not in visit:
                if has_cycle(neighbor):
                    return True
            elif neighbor in path:
                return True
        
        path.remove(node)
        return False
    
    is_dag = True
    for node in adj_list:
        if node not in visit:
            if has_cycle(node):
                is_dag = False
                break

    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}
