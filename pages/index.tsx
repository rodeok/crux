import { useState } from 'react';
import axios from 'axios';
import styles from '../styles.module.css';

interface FormData {
  origin: string;
  metrics: string[];
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    origin: '',
    metrics: [],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/chromeuxreport', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMetricChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        metrics: [...formData.metrics, name],
      });
    } else {
      setFormData({
        ...formData,
        metrics: formData.metrics.filter((metric) => metric !== name),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Origin:
        <input type="text" name="origin" onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Metrics:
        <br />
        <label>
          <input
            type="checkbox"
            name="largest_contentful_paint"
            onChange={handleMetricChange}
          />
          Largest Contentful Paint
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="first_input_delay"
            onChange={handleMetricChange}
          />
          First Input Delay
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="cumulative_layout_shift"
            onChange={handleMetricChange}
          />
          Cumulative Layout Shift
        </label>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
