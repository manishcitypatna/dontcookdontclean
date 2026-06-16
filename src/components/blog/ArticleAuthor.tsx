export default function ArticleAuthor({ name, bio }: { name: string; bio: string }) {
  return (
    <section className="py-8">
      <div className="container max-w-3xl mx-auto">
        <div className="card flex items-start gap-4 md:gap-6">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <svg
              className="w-8 h-8 md:w-10 md:h-10 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <h4 className="h4 text-text-primary mb-1">{name}</h4>
            <p className="body text-text-secondary">{bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
