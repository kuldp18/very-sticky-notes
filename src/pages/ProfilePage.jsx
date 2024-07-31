import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();
  // TODO: get total note count from the user's notes
  return (
    <>
      <div className="relative">
        <div className="text-9xl absolute left-5 bottom-5 opacity-[0.01] rotate-90">
          😏
        </div>
        <div className="text-9xl absolute right-5 top-14 opacity-[0.01]  rotate-45">
          😏
        </div>
        <section className="profile min-h-screen flex flex-col gap-3 justify-center items-start bg-purple-700 w-[40%] mx-auto relative px-8">
          <div className="emoji text-9xl absolute top-10 left-6 rotate-45">
            😭
          </div>
          <div className="emoji text-9xl absolute top-20 right-2 rotate-6">
            💀
          </div>
          <div className="emoji text-9xl absolute bottom-20 right-12 rotate-12">
            💔
          </div>
          <div className="emoji text-9xl absolute bottom-28 left-3 -rotate-12">
            😔
          </div>
          <div className="item text-3xl">Name: {user?.name}</div>
          <div className="item text-3xl">Email: {user?.email}</div>
          <div className="item text-3xl">Notes created: 10</div>
        </section>
      </div>
    </>
  );
};

export default ProfilePage;
