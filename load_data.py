#load_data.py
import os
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from config import PDF_PATH  # Ensure PDF_PATH and COMPANY_WEBSITE is a list of valid file paths
from langchain.schema import Document 

def load_pdf():
    
    """Load and extract text from multiple preloaded company PDFs."""
    
    # Ensure PDF_PATH is a list
    if isinstance(PDF_PATH, str):
        pdf_files = [PDF_PATH]  # Convert single file path to list
    elif isinstance(PDF_PATH, list):
        pdf_files = PDF_PATH
    else:
        raise ValueError("PDF_PATH should be a string (single file) or a list of file paths.")

    all_documents = []
    for file_path in pdf_files:
        if os.path.exists(file_path):
            pdf_loader = PyPDFLoader(file_path)
            all_documents.extend(pdf_loader.load())  # Append loaded pages
        else:
            print(f"Warning: File not found - {file_path}")

    if not all_documents:
        raise ValueError("PDF not loaded.")

    return all_documents

def split_text(documents):
    """Split text into smaller chunks for efficient retrieval."""
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    return text_splitter.split_documents(documents)

#def load_all_data():
    #"""Combine PDF and website data into a single document list."""
   # pdf_data = load_pdf()
    #website_data = load_website_data()
    
    #combined_data = pdf_data + website_data

    #return split_text(combined_data)