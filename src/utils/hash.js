import shortid from 'shortid';
import Hashids from 'hashids';

export default function generateHash() {
  const hashids = new Hashids(shortid.generate(), 8);
  const hash = hashids.encode(1);

  return hash;
}
