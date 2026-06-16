import os
import sys

def main():
    pdf_path = "COMPRO IDEA REVISI fix.pdf"
    output_dir = "extracted_images"
    os.makedirs(output_dir, exist_ok=True)
    
    print("Checking for PDF image extraction libraries...")
    
    # Try using pypdf / PyPDF2
    try:
        from pypdf import PdfReader
        print("Using pypdf...")
        reader = PdfReader(pdf_path)
        img_count = 0
        for i, page in enumerate(reader.pages):
            for count, image_file_object in enumerate(page.images):
                name = f"page_{i+1}_img_{count}_{image_file_object.name}"
                out_path = os.path.join(output_dir, name)
                with open(out_path, "wb") as fp:
                    fp.write(image_file_object.data)
                img_count += 1
        print(f"Extracted {img_count} images using pypdf.")
        return
    except ImportError:
        print("pypdf not found.")

    # Try using PyPDF2
    try:
        import PyPDF2
        print("Using PyPDF2...")
        reader = PyPDF2.PdfReader(pdf_path)
        img_count = 0
        for i, page in enumerate(reader.pages):
            if '/Resources' in page and '/XObject' in page['/Resources']:
                xObject = page['/Resources']['/XObject'].get_object()
                for obj in xObject:
                    if xObject[obj]['/Subtype'] == '/Image':
                        size = (xObject[obj]['/Width'], xObject[obj]['/Height'])
                        data = xObject[obj].get_data()
                        if '/Filter' in xObject[obj]:
                            if xObject[obj]['/Filter'] == '/DCTDecode':
                                ext = 'jpg'
                            elif xObject[obj]['/Filter'] == '/FlateDecode':
                                ext = 'png'
                            else:
                                ext = 'bin'
                        else:
                            ext = 'bin'
                        name = f"page_{i+1}_img_{obj[1:]}.{ext}"
                        out_path = os.path.join(output_dir, name)
                        with open(out_path, "wb") as fp:
                            fp.write(data)
                        img_count += 1
        print(f"Extracted {img_count} images using PyPDF2.")
        return
    except ImportError:
        print("PyPDF2 not found.")

    # Try using fitz (PyMuPDF)
    try:
        import fitz  # PyMuPDF
        print("Using PyMuPDF (fitz)...")
        doc = fitz.open(pdf_path)
        img_count = 0
        for i in range(len(doc)):
            for img_index, img in enumerate(doc.get_page_images(i)):
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]
                name = f"page_{i+1}_img_{img_index}.{image_ext}"
                out_path = os.path.join(output_dir, name)
                with open(out_path, "wb") as fp:
                    fp.write(image_bytes)
                img_count += 1
        print(f"Extracted {img_count} images using PyMuPDF.")
        return
    except ImportError:
        print("PyMuPDF not found.")

    print("Please install pypdf, PyPDF2, or PyMuPDF using pip: pip install pypdf")

if __name__ == "__main__":
    main()
