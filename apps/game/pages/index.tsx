import Quizlet from 'dataset';
import Fun from 'dataset/sets/Fun';
import { MediaType } from 'dataset/types';
import Image from 'next/image';

const IMAGE_HEIGHT = 100;
const IMAGE_WIDTH = 120;
export default function Game() {
  // If you don't want SSR
  if (typeof window !== 'undefined') return null;

  // to get a specific Set
  const { disneyPrincessTrivia: quizletSet } = Fun.getAllSetsMap();
  // const quizletSet = Quizlet.getRandomSet();

  const renderCardSide = termMedia => {
    switch (termMedia.type) {
      case MediaType.TEXT:
        const { languageCode, plainText, richText, ttsUrl } = termMedia;
        return <div key={termMedia.type}>{plainText}</div>;
      case MediaType.IMAGE:
        const { url } = termMedia;
        return (
          <Image
            alt="term image"
            height={IMAGE_HEIGHT}
            key={termMedia.type}
            src={url}
            width={IMAGE_WIDTH}
          />
        );
    }
  };
  const renderTerm = studiableItem => (
    <div key={studiableItem.id}>
      {studiableItem.cardSides.map(cardSide => {
        const { label, media } = cardSide;
        return (
          <div key={cardSide.sideId}>
            {label}: {media.map(termMedia => renderCardSide(termMedia))}
          </div>
        );
      })}
    </div>
  );

  const renderTerms = studiableItems => (
    <>
      <h3>({studiableItems.length} Terms)</h3>
      {studiableItems.map(studiableItem => renderTerm(studiableItem))}
    </>
  );

  return (
    <div>
      <h1>Your game title here!</h1>
      <h2>Set used: {quizletSet.set.title}</h2>
      {renderTerms(quizletSet.studiableItem)}
    </div>
  );
}
