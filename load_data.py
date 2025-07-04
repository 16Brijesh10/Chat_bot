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
        pdf_files = PDF_PATH#load_data.py
import os
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from config import PDF_PATH
from langchain.schema import Document

from pdf2image import convert_from_path
import pytesseract

def load_pdf():
    """Load and extract text from multiple preloaded company PDFs with OCR fallback."""
    if isinstance(PDF_PATH, str):
        pdf_files = [PDF_PATH]
    elif isinstance(PDF_PATH, list):
        pdf_files = PDF_PATH
    else:
        raise ValueError("PDF_PATH should be a string or list.")

    all_documents = []
    
    for file_path in pdf_files:
        if not os.path.exists(file_path):
            print(f"Warning: File not found - {file_path}")
            continue

        try:
            loader = PyPDFLoader(file_path)
            docs = loader.load()
            all_documents.extend(docs)

            # Check for pages with no text and OCR them
            empty_docs = [doc for doc in docs if not doc.page_content.strip()]
            if empty_docs:
                print(f"OCR fallback for {len(empty_docs)} pages in {file_path}")
                images = convert_from_path(file_path)
                for i, img in enumerate(images):
                    text = pytesseract.image_to_string(img)
                    if text.strip():
                        all_documents.append(Document(page_content=text, metadata={"source": file_path, "page": i+1}))
        except Exception as e:
            print(f"Error loading PDF {file_path}: {e}")

    if not all_documents:
        raise ValueError("No content extracted from PDFs.")

    return all_documents

def split_text(documents):
    """Split text into smaller chunks for efficient retrieval."""
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    return text_splitter.split_documents(documents)

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
