import { Post } from './Post';
import { MOCK_POSTS } from '@/lib/mock-data';

export function Feed() {
    return (
        <div className="flex flex-col w-full max-w-[600px] mx-auto pb-20">
            {MOCK_POSTS.map((post) => (
                <Post
                    key={post.id}
                    user={{
                        name: post.author.username,
                        image: post.author.photoURL,
                        location: post.location
                    }}
                    image={post.mediaURL}
                    likes={post.likes.length}
                    caption={post.content}
                    timestamp={new Date(post.createdAt).toLocaleDateString(undefined, {
                        month: 'long',
                        day: 'numeric'
                    })}
                />
            ))}
        </div>
    );
}
