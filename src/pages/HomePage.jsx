import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadList from '../components/Thread/ThreadList';
import ThreadForm from '../components/Forms/ThreadForm';
import { asyncGetThreads, asyncAddThread } from '../states/threads/thunks';

export default function HomePage() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads);
  const authUser = useSelector((state) => state.authUser);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      await dispatch(asyncGetThreads());
      setIsLoading(false);
    }
    load();
  }, [dispatch]);

  function handleAddThread({ title, body, category }) {
    if (!authUser) {
      alert('Login dulu untuk membuat thread.');
      return;
    }
    dispatch(asyncAddThread({ title, body, category }));
  }

  const categories = [
    ...new Set(
      threads
        .map((t) => t.category)
        .filter((c) => c !== null && c !== undefined && c !== '')
    ),
  ];

  const filteredThreads = selectedCategory
    ? threads.filter((t) => t.category === selectedCategory)
    : threads;

  if (isLoading) {
    return <p>Loading threads...</p>;
  }

  return (
    <div>
      {authUser && <ThreadForm onSubmit={handleAddThread} />}

      {categories.length > 0 && (
        <div style={{ margin: '1.5rem 0' }}>
          <strong>Filter kategori: </strong>
          <button
            type="button"
            onClick={() => setSelectedCategory('')}
            style={{
              marginRight: '0.5rem',
              fontWeight: !selectedCategory ? '700' : '400',
            }}
          >
            Semua
          </button>

          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                marginRight: '0.5rem',
                fontWeight: selectedCategory === cat ? '700' : '400',
              }}
            >
              #{cat}
            </button>
          ))}
        </div>
      )}

      <ThreadList threads={filteredThreads} />
    </div>
  );
}
