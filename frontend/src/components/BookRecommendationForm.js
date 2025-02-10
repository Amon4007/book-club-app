import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const BookRecommendationForm = ({ clubId, userId }) => {
    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        author: Yup.string().required('Author is required'),
    });

    return (
        <Formik
            initialValues={{ title: '', author: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                axios.post(`http://localhost:5000/clubs/${clubId}/books`, {
                    ...values,
                    user_id: userId,
                })
                .then(() => {
                    resetForm();
                })
                .catch(error => console.error('Submission error:', error));
            }}
        >
            <Form className="mb-4">
                <div className="mb-3">
                    <Field
                        name="title"
                        placeholder="Book Title"
                        className="form-control"
                    />
                    <ErrorMessage name="title" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                    <Field
                        name="author"
                        placeholder="Author Name"
                        className="form-control"
                    />
                    <ErrorMessage name="author" component="div" className="text-danger" />
                </div>
                <button type="submit" className="btn btn-primary">Recommend Book</button>
            </Form>
        </Formik>
    );
};

export default BookRecommendationForm;