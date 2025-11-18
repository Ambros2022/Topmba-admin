const YoutubeVideo = ({ videoId }) => {
    return (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#000' }}>
            <iframe
                src={`https://www.youtube.com/embed/${videoId}/maxresdefault.jpg`}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded YouTube Video"
            />
        </div>
    );
}
export default YoutubeVideo;