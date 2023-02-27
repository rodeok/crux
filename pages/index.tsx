import axios from 'axios';
import { useState, FormEvent } from 'react';

// import  '../styles/styles.module.css';
// import "../styles/styles.css"
import styles from '../styles/InputForm.module.css';

interface FormData {
  origin: string;
  metrics: string[];
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    origin: '',
    metrics: [],
  });

  const [result, setResult] = useState(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/query', formData);
      setResult(response.data);
    } catch (error) {
      console.error(error);
      setResult(null);
    }
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
  const handleOriginChange = (event: FormEvent<HTMLInputElement>) => {
    setFormData({ ...formData, origin: event.currentTarget.value });
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
  const handleMetricsChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      metrics: event.currentTarget.value.split('\n').filter((x) => x !== ''),
    });
  };
  return (
    <div  className={styles.container} >

    
    <form onSubmit={handleSubmit}  className={styles.form}>
      <label className={styles.label}>
        Origin:
        <input 
        className={styles.input}
        id="origin"
        type="text"
        value={formData.origin}
        onChange={handleOriginChange}
         />
      </label>
      <br />
      <label className={styles.label} htmlFor="metrics">
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
           className={styles.labeltext}
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
      <textarea
          className={styles.textarea}
          id="metrics"
          value={formData.metrics.join('\n')}
          onChange={handleMetricsChange}
        />
      <br />
      <button type="submit" className={styles.button} >Submit</button>
    </form>
    {result && (
        <div className={styles.result}>
          <h2>Query Result</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
