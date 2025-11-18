import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetLeaderboards } from '../states/leaderboard/thunks';

export default function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboard = useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  if (!Array.isArray(leaderboard)) {
    return <p>Loading leaderboard...</p>;
  }

  return (
    <div>
      <h2>Leaderboard</h2>

      {leaderboard.length === 0 && <p>Belum ada leaderboard.</p>}

      {leaderboard.map(({ user, score }) => (
        <div
          key={user.id}
          style={{
            padding: '1rem',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <img
            src={user.avatar}
            alt={user.name}
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
            }}
          />
          <div style={{ fontSize: '1.1rem' }}>{user.name}</div>
          <div style={{ marginLeft: 'auto', fontWeight: 'bold' }}>{score}</div>
        </div>
      ))}
    </div>
  );
}
