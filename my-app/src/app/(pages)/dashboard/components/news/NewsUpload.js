import { useState } from 'react';
import './News.css';

const NewsUpload = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        imageUrl: ''
    });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Format date to ISO string
            const formattedData = {
                ...formData,
                date: new Date(formData.date).toISOString()
            };
            
            const res = await fetch('/api/dashboard/news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formattedData)
            });
            if (res.ok) {
                setMessage('News article uploaded successfully!');
                setFormData({ title: '', description: '', date: '', imageUrl: '' });
            } else {
                setMessage('Failed to upload news article');
            }
        } catch (error) {
            setMessage('Error uploading news article');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="newsupload-component">
            <div className="newsupload-component-heading">
                <h2>Instructions to update club details</h2>
                <p>Resize Image: Use the provided Canva link to resize the image to the optimal dimensions for website display.
                <a href="https://www.canva.com/design/DAGVOb7x6hg/H4_YD4-t9s5ZT-iXhWKKjg/view?utm_content=DAGVOb7x6hg&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview"> Canva Link</a></p>
                <p>After resizing the image, download it and upload it to a storage service like <a href="https://www.imghippo.com">ImgHippo</a> Please refer to the <a href="https://firebasestorage.googleapis.com/v0/b/sacwebsite-8d0b5.appspot.com/o/Video_Tutorial.mp4?alt=media&token=a9487ecb-40aa-423a-bf20-26150128b7f5">Video Tutorial</a></p>
            </div> 
            <div className="newsupload-component-main">
                <form onSubmit={handleSubmit}>
                    <div className="newsform-group">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text" 
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="newsform-group">
                        <label htmlFor="description">Description</label>
                        <input 
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="newsform-group">
                        <label htmlFor="date">Date</label>
                        <input 
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="newsform-group">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input 
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Upload News</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}

export default NewsUpload;