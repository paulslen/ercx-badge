// src/components/TokenScore.tsx
import React, { useState, useEffect } from 'react';

interface TokenScoreProps {
  tokenAddress: string;
  networkId: number;
}

const TokenScore: React.FC<TokenScoreProps> = ({ tokenAddress, networkId }) => {
  const [score, setScore] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tokenAddress) return;

    const fetchScore = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://ercx.runtimeverification.com/api/v1/tokens/${networkId}/${tokenAddress}/report?fields=text%2Cjson%2Cevaluations`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'X-API-KEY': process.env.REACT_APP_API_KEY // Ensure this key is stored securely and not exposed in production
          }
        });
        if (!response.ok) throw new Error(`HTTP status ${response.status}`);
        const data = await response.json();
        // Assuming you want to display the global score from the text field
        const scoreMatch = data.text.match(/global score: (\d+) \//i);
        if (scoreMatch && scoreMatch.length > 1) {
          setScore(scoreMatch[1]);  // Set the extracted score
        } else {
          setScore("Score not found");
        }
      } catch (error) {
        setError('Failed to fetch score');
        console.error('Error fetching score:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScore();
  }, [tokenAddress, networkId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <div className="badge"><span className="badge-text">{score}</span></div>;
};

export default TokenScore;
