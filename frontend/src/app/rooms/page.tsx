"use client";

import GlassHeader from "@/components/glass-header";
import { API_BASE_URL } from "@/constant/constant";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type TeamInfo = {
  name: string;
  logo: string | null;
};

type TeamMatchup = {
  teamA: TeamInfo;
  teamB: TeamInfo;
};

type RoomStatus = "Đang thi đấu" | "Đang chờ" | "Chưa thi đấu";

type ActiveRoom = {
  code: string;
  name: string;
  bestOf: "Best of 1" | "Best of 3" | "Best of 5" | "Best of 7" | "Best of 11";
  status: RoomStatus;
  currentPlayers: number;
  maxPlayers: number;
  teams: TeamMatchup;
};

type RoomWithCode = ActiveRoom & { code: string };

function getRoomStatusLabel(room: ActiveRoom) {
  if (room.status === "Đang chờ" && room.currentPlayers >= room.maxPlayers) {
    return "Đang chờ (đủ người chơi)";
  }

  return room.status;
}

export default function Rooms() {
  const router = useRouter();
  const [rooms, setRooms] = useState<RoomWithCode[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/rooms/`);
        const data = await response.json();

        let rooms: ActiveRoom[] = data.data.map((room: any) => ({
          code: room.roomId,
          name: room.name,
          bestOf: room.bestOf,
          status: room.status === "waiting" ? "Đang chờ" : room.status === "playing" ? "Đang thi đấu" : "Chưa thi đấu",
          teamAPlayers: room.teamAPlayers,
          teamBPlayers: room.teamBPlayers,
          currentPlayers: room.teamAPlayers.length + room.teamBPlayers.length,
          maxPlayers: room.maxPlayers,
          teams: {
            teamA: {
              name: room.teamAName,
              logo: room.teamAImage || null,
            },
            teamB: {
              name: room.teamBName,
              logo: room.teamBImage || null,
            },
          },
        }));

        setRooms(rooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const [selectedRoom, setSelectedRoom] = useState<RoomWithCode | null>(null);
  const [popupType, setPopupType] = useState<"blocked" | "setup" | null>(null);
  const [gameName, setGameName] = useState("");
  const [roomSearch, setRoomSearch] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [representativeTeam, setRepresentativeTeam] = useState<"A" | "B">("A");
  const [teamName, setTeamName] = useState("");
  const [joinError, setJoinError] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  const filteredRooms = useMemo(() => {
    const keyword = roomSearch.trim().toLowerCase();

    if (!keyword) {
      return rooms;
    }

    return rooms.filter((room) => room.code.toLowerCase().includes(keyword));
  }, [roomSearch, rooms]);

  const closePopup = () => {
    setSelectedRoom(null);
    setPopupType(null);
    setJoinError(null);
    setIsJoining(false);
  };

  const handleJoinRoom = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedRoom) {
      setJoinError("Không tìm thấy phòng để tham gia.");
      return;
    }

    setIsJoining(true);
    setJoinError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/rooms/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: selectedRoom.code,
          teamName,
          playerName: gameName,
          password: roomPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setJoinError(data.message ?? "Không thể tham gia phòng");
        return;
      }

      closePopup();
      router.replace("/");
    } catch {
      setJoinError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
    } finally {
      setIsJoining(false);
    }
  };

  const handleRoomClick = (room: RoomWithCode) => {
    const isFull = room.currentPlayers >= room.maxPlayers;

    setSelectedRoom(room);

    if (room.status === "Đang thi đấu" || isFull) {
      setPopupType("blocked");
      return;
    }

    if (room.status === "Đang chờ" || room.status === "Chưa thi đấu") {
      setPopupType("setup");
      setGameName("");
      setRoomPassword("");
      setRepresentativeTeam("A");
      setTeamName(room.teams.teamA.name);
      return;
    }

    setPopupType("blocked");
  };

  return (
    <main className="relative isolate overflow-hidden px-6 pb-16 pt-3 md:px-12 md:pb-24 md:pt-5">
      <div className="pointer-events-none absolute right-[8%] -top-64 -z-10 h-136 w-136 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.24)_0%,rgba(2,6,23,0)_70%)] blur-3xl" />

      <GlassHeader
        className="mb-8"
        title="Cáp Kèo Free Fire"
        subtitle="Ban Pick System"
        logoSrc="/images/CKFF-White.png"
        logoAlt="BanPick Tool"
        actions={[
          { label: "Trang chủ", href: "/", variant: "ghost" },
          { label: "Tạo phòng", href: "/rooms/create", variant: "primary" },
        ]}
      />

      <section className="mx-auto w-full max-w-7xl rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(8,14,30,0.9),rgba(17,24,39,0.55))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:p-8">
        <p className="inline-flex items-center rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-200">
          {rooms.length} phòng đang hoạt động
        </p>
        <h2 className="mt-4 max-w-3xl text-3xl leading-tight font-semibold text-(--text-strong) md:text-5xl">
          Danh sách phòng thi đấu
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-(--text-muted) md:text-base">
          Hãy tìm phòng và tham gia để trải nghiệm hệ thống Ban/Pick Analytics theo thời gian thực của chúng tôi, hỗ trợ bạn đưa ra quyết định chiến thuật nhanh chóng và chính xác trong từng lượt cấm chọn.
        </p>

        <div className="mt-6 max-w-md">
          <label htmlFor="room-search" className="mb-2 block text-sm text-(--text-muted)">
            Tìm phòng theo mã phòng
          </label>
          <input
            id="room-search"
            type="text"
            value={roomSearch}
            onChange={(event) => setRoomSearch(event.target.value)}
            placeholder="VD: RM-1024"
            className="focus-ring h-11 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 text-sm text-(--text-strong) placeholder:text-slate-400"
          />
        </div>

        <div className="mt-8 space-y-3">
          {filteredRooms.map((room) => (
            <article
              key={room.code}
              className="cursor-pointer rounded-xl border border-white/10 bg-(--surface-glass) p-4 transition-colors duration-200 hover:border-blue-300/35"
              onClick={() => handleRoomClick(room)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleRoomClick(room);
                }
              }}
            >
              <div className="grid gap-3 md:grid-cols-[1.1fr_1.3fr_1fr_1fr_0.9fr] md:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-(--text-muted)">Mã phòng</p>
                  <p className="mt-1 text-base font-semibold text-(--text-strong)">{room.code}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-(--text-muted)">Tên phòng</p>
                  <p className="mt-1 text-base font-semibold text-(--text-strong)">{room.name}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-(--text-muted)">Thể thức</p>
                  <p className="mt-1 text-base font-semibold text-(--text-strong)">{room.bestOf}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-(--text-muted)">Trạng thái</p>
                  <span
                    className={`mt-1 inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
                      room.status === "Đang thi đấu"
                        ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
                        : "border-amber-300/35 bg-amber-400/10 text-amber-200"
                    }`}
                  >
                    {getRoomStatusLabel(room)}
                  </span>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-(--text-muted)">Số người</p>
                  <p className="mt-1 text-base font-semibold text-(--text-strong)">
                    {room.currentPlayers}/{room.maxPlayers}
                  </p>
                </div>
              </div>
            </article>
          ))}

          {filteredRooms.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-(--surface-glass) p-5 text-sm text-(--text-muted)">
              Không tìm thấy phòng nào khớp với mã phòng bạn nhập.
            </div>
          ) : null}
        </div>
      </section>

      {popupType && selectedRoom ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-2xl rounded-2xl border border-white/15 bg-[linear-gradient(160deg,rgba(8,14,30,0.95),rgba(17,24,39,0.75))] p-5 shadow-[0_16px_48px_rgba(2,6,23,0.55)] md:p-6"
          >
            {popupType === "blocked" ? (
              <>
                <h3 className="text-xl font-semibold text-(--text-strong)">Không thể vào phòng</h3>
                <p className="mt-3 text-sm leading-7 text-(--text-muted)">
                  Phòng {selectedRoom.code} hiện {getRoomStatusLabel(selectedRoom).toLowerCase()} hoặc đã đủ người chơi.
                  Vui lòng chọn phòng khác.
                </p>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={closePopup}
                    className="focus-ring inline-flex h-10 items-center justify-center rounded-full bg-(--color-primary) px-5 text-sm font-medium text-white transition-colors hover:bg-(--color-primary-hover)"
                  >
                    Đóng
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-extrabold text-(--text-strong)">Thiết lập thông tin thi đấu</h2>
                <p className="mt-2 text-sm text-(--text-muted)">
                  Hãy điền các thông tin để tham gia thi đấu tại phòng {selectedRoom.code || selectedRoom.name}
                </p>

                <form
                  className="mt-5 space-y-5"
                  onSubmit={handleJoinRoom}
                >
                  {joinError ? (
                    <div className="rounded-xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      {joinError}
                    </div>
                  ) : null}

                  <div>
                    <label htmlFor="game-name" className="mb-2 block text-sm text-(--text-muted)">
                      Tên game vào trận
                    </label>
                    <input
                      id="game-name"
                      type="text"
                      required
                      value={gameName}
                      onChange={(event) => setGameName(event.target.value)}
                      className="focus-ring h-11 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 text-sm text-(--text-strong) placeholder:text-slate-400"
                      placeholder="VD: CKFF Week 4 - Match 01"
                    />
                  </div>

                  <div>
                    <p className="mb-2 block text-sm text-(--text-muted)">Chọn 1 đội đại diện thi đấu</p>

                    <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Chọn đội đại diện">
                      <button
                        type="button"
                        role="radio"
                        aria-checked={representativeTeam === "A"}
                        onClick={() => {
                          setRepresentativeTeam("A");
                          setTeamName(selectedRoom.teams.teamA.name);
                        }}
                        className={`focus-ring rounded-xl border p-3 text-left transition-colors ${
                          representativeTeam === "A"
                            ? "border-blue-300/60 bg-blue-500/15"
                            : "border-white/10 bg-(--surface-glass)"
                        }`}
                      >
                        <p className="text-xs uppercase tracking-[0.16em] text-(--text-muted)">Đội A</p>
                        <div className="mt-2 flex items-center gap-3">
                          <Image
                            src={selectedRoom.teams.teamA.logo || "/images/CKFF-Black.png"}
                            alt={selectedRoom.teams.teamA.name}
                            width={44}
                            height={44}
                            className="rounded-lg border border-white/15 bg-slate-900/80 p-1"
                          />
                          <p className="text-sm font-semibold text-(--text-strong)">{selectedRoom.teams.teamA.name}</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        role="radio"
                        aria-checked={representativeTeam === "B"}
                        onClick={() => {
                          setRepresentativeTeam("B");
                          setTeamName(selectedRoom.teams.teamB.name);
                        }}
                        className={`focus-ring rounded-xl border p-3 text-left transition-colors ${
                          representativeTeam === "B"
                            ? "border-blue-300/60 bg-blue-500/15"
                            : "border-white/10 bg-(--surface-glass)"
                        }`}
                      >
                        <p className="text-xs uppercase tracking-[0.16em] text-(--text-muted)">Đội B</p>
                        <div className="mt-2 flex items-center gap-3">
                          <Image
                            src={selectedRoom.teams.teamB.logo || "/images/CKFF-Black.png"}
                            alt={selectedRoom.teams.teamB.name}
                            width={44}
                            height={44}
                            className="rounded-lg border border-white/15 bg-slate-900/80 p-1"
                          />
                          <p className="text-sm font-semibold text-(--text-strong)">{selectedRoom.teams.teamB.name}</p>
                        </div>
                      </button>
                    </div>

                    <p className="mt-2 text-xs text-(--text-muted)">
                      Đội đại diện: {representativeTeam === "A" ? selectedRoom.teams.teamA.name : selectedRoom.teams.teamB.name}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="room-password" className="mb-2 block text-sm text-(--text-muted)">
                      Password của phòng (demo)
                    </label>
                    <input
                      id="room-password"
                      type="password"
                      required
                      value={roomPassword}
                      onChange={(event) => setRoomPassword(event.target.value)}
                      className="focus-ring h-11 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 text-sm text-(--text-strong) placeholder:text-slate-400"
                      placeholder="Nhap password"
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={closePopup}
                      className="focus-ring inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 text-sm font-medium text-(--text-strong)"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={isJoining}
                      className="focus-ring inline-flex h-10 items-center justify-center rounded-full bg-(--color-primary) px-5 text-sm font-medium text-white transition-colors hover:bg-(--color-primary-hover) disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isJoining ? "Đang vào phòng..." : "Xác nhận"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}