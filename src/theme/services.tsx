import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const w = (w: number) => wp(w + "%");
const h = (h: number) => hp(h + "%");

export { w, h };