import Image from "next/image";
import styles from "./page.module.css";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/matches/all");
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/logos/inshorts.jpg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </main>
    </div>
  );
}
