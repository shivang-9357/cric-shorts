"use client";
import React, { useEffect, useRef, useState } from "react";
import { getMatchScore, getMatchStatus, getMatchWinner } from "@/utils/common";
import { Box, Center, Spinner, Stack, Text } from "@chakra-ui/react";
import MatchCard from "../cards/MatchCard";
import { useAppContext } from "@/context/AppContext";
import { Match } from "@/lib/interfaces";
import { useParams } from "next/navigation";

const MatchesWrapper = ({ matches }: { matches: Match[] }) => {
  const [moreMatches, setMoreMatches] = useState(matches);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { status } = useParams();

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadingRef = useRef(false);

  useEffect(() => {
    setMoreMatches(matches);
    setPage(1);
    setHasMore(true);
  }, [status, matches]);

  useEffect(() => {
    const el = loaderRef.current;

    if (!el || !hasMore) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loadingRef.current) {
          loadingRef.current = true;
          setTimeout(() => {
            setPage((prev) => prev + 1);
          }, 100); // debounce trigger slightly
        }
      },
      {
        rootMargin: "100px",
      }
    );
    observer.observe(el);
    observerRef.current = observer;

    return () => {
      if (el) observerRef.current?.unobserve(el);
    };
  }, [hasMore]);

  useEffect(() => {
    if (page > 1) loadMore();
  }, [page]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const res = await (
        await fetch(`/api/matches?status=${status || ""}&page=${page}`)
      ).json();

      const moreMatches = res.matches;
      console.log(moreMatches);

      if (!moreMatches || moreMatches.length === 0) {
        setHasMore(false);
        return;
      }
      setMoreMatches((prev) => [...prev, ...moreMatches]);
      if (moreMatches?.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  return (
    <Stack h={"100%"} p={"20px"} pt={"100px"} overflow={"auto"}>
      {!moreMatches.length ? (
        <Center>
          <Text>No Live Matches</Text>
        </Center>
      ) : (
        <>
          {moreMatches.map((match) => {
            const { matchNumber, venue, teamA, teamB, date, time } = match;
            const matchStatus = getMatchStatus(date, time);
            const matchScore = getMatchScore(
              teamA.code,
              teamB.code,
              date,
              time
            );
            const matchWinner = getMatchWinner(teamA.code, teamB.code, venue);
            return (
              <MatchCard
                key={matchNumber.toString()}
                matchNumber={matchNumber.toString()}
                venue={venue}
                teamA={teamA}
                teamB={teamB}
                date={date}
                time={time}
                matchStatus={matchStatus}
                matchWinner={matchWinner}
                matchScore={matchScore}
              />
            );
          })}
          <Box ref={loaderRef} textAlign="center" p={4}>
            {loading && <Spinner />}
            {!hasMore && <Text>No more matches</Text>}
          </Box>
        </>
      )}
    </Stack>
  );
};

export default MatchesWrapper;
