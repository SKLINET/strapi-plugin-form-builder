import { Routes, Route } from 'react-router-dom';

import { HomePage } from './HomePage';
import { DetailPage } from './DetailPage';

const App = () => {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="*" element={<DetailPage />} />
        </Routes>
    );
};

export { App };
