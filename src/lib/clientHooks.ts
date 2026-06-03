"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentCandidate, isAdminSession } from "@/lib/auth";
import type { Candidate } from "@/types";

export function useCandidateGuard() {
  const router = useRouter();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const current = await getCurrentCandidate();
    if (!current) {
      router.push("/login");
      return;
    }
    setCandidate(current);
    setLoading(false);
  };

  useEffect(() => {
    void refresh();
  }, []);

  return { candidate, setCandidate, loading, refresh };
}

export function useAdminGuard() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdminSession()) {
      router.push("/admin/login");
      return;
    }
    setAllowed(true);
    setLoading(false);
  }, [router]);

  return { allowed, loading };
}
