import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ThreadDetail from '../components/Thread/ThreadDetail';
import CommentList from '../components/Thread/CommentList';
import CommentForm from '../components/Forms/CommentForm';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
} from '../states/threadDetail/thunks';

export default function ThreadDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      await dispatch(asyncReceiveThreadDetail(id));
      setIsLoading(false);
    }
    load();
  }, [dispatch, id]);

  function handleAddComment(content) {
    if (!authUser) {
      alert('Anda harus login untuk mengomentari thread.');
      return null;
    }

    return dispatch(asyncAddComment(id, content));
  }

  if (isLoading || !threadDetail) {
    return <p>Loading detail thread...</p>;
  }

  return (
    <div>
      <ThreadDetail thread={threadDetail} />

      <section style={{ marginTop: '2rem' }}>
        <h2>Komentar</h2>

        {authUser && <CommentForm onSubmit={handleAddComment} />}

        <CommentList comments={threadDetail.comments} />
      </section>
    </div>
  );
}
