import { useDispatch } from 'react-redux';
import { AppDispatch } from '~/redux/store/configureStore';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
