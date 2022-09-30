import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import sys

books = pd.read_csv(r'import\books.csv', encoding = "ISO-8859-1", sep=';')
book_tags = pd.read_csv(r'import\book_tags.csv')
tags = pd.read_csv(r'import\tags.csv')

tags_join_DF = pd.merge(book_tags, tags, left_on='tag_id', right_on='tag_id', how='inner')

books_with_tags = pd.merge(books, tags_join_DF, left_on='book_id', right_on='goodreads_book_id', how='inner')

temp_df = books_with_tags.groupby('book_id')['tag_name'].apply(' '.join).reset_index()

books = pd.merge(books, temp_df, left_on='book_id', right_on='book_id', how='inner')

books['corpus'] = (pd.Series(books[['authors', 'tag_name']]
                .fillna('')
                .values.tolist()
                ).str.join(' '))
                
tf_corpus = TfidfVectorizer(analyzer='word',ngram_range=(1, 2),min_df=0, stop_words='english')
tfidf_matrix_corpus = tf_corpus.fit_transform(books['corpus'])
cosine_sim_corpus = linear_kernel(tfidf_matrix_corpus, tfidf_matrix_corpus)

# Build a 1-dimensional array with book titles
titles = books['title']
indices = pd.Series(books.index, index=books['title'])

# Function that get book recommendations based on the cosine similarity score of books tags
def corpus_recommendations(title):
    idx = indices[title]
    sim_scores = list(enumerate(cosine_sim_corpus[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:21]
    book_indices = [i[0] for i in sim_scores]
    recommender = titles.iloc[book_indices]
    recommender = recommender.tolist()
    return recommender

recommender = corpus_recommendations(sys.argv[1])
print('; '.join(recommender))