import { useDispatch } from 'react-redux';
import { AppDispatch } from '~/redux/store/configureStore';

const useTypedDispatch = () => useDispatch<AppDispatch>();

export default useTypedDispatch;
