import os
import shutil
import subprocess
import imageio_ffmpeg

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
vdir = 'assets/video'
backup_dir = 'assets/video_backup_originals'
os.makedirs(backup_dir, exist_ok=True)

files = [
    ('ScoccerStrikerProject.mp4', 'ScoccerStrikerProject.mp4', 28),
    ('p1.mp4', 'p1.mp4', 28),
    ('CapsBallv2.mp4', 'CapsBallv2.mp4', 27),
    ('TennisFreak.webm', 'TennisFreak.mp4', 28),
    ('AircraftGameplayWeb.webm', 'AircraftGameplayWeb.mp4', 28),
]

print("=== Starting Video Optimization ===")
total_orig = 0
total_new = 0

for src_name, dst_name, crf in files:
    src_path = os.path.join(vdir, src_name)
    backup_path = os.path.join(backup_dir, src_name)
    
    if not os.path.exists(backup_path):
        print(f"Backing up {src_name} -> {backup_dir}/")
        shutil.copy2(src_path, backup_path)
    else:
        print(f"Backup already exists for {src_name}")
        
    s_orig = os.path.getsize(backup_path) / (1024 * 1024)
    total_orig += s_orig
    
    temp_dst = os.path.join(vdir, f"temp_{dst_name}")
    cmd = [
        ffmpeg, '-y', '-i', backup_path,
        '-c:v', 'libx264', '-crf', str(crf), '-preset', 'fast',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac', '-b:a', '128k',
        '-movflags', '+faststart',
        temp_dst
    ]
    
    print(f"Compressing {src_name} (CRF {crf})...")
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    final_dst = os.path.join(vdir, dst_name)
    if os.path.exists(final_dst):
        os.remove(final_dst)
    os.rename(temp_dst, final_dst)
    
    s_new = os.path.getsize(final_dst) / (1024 * 1024)
    total_new += s_new
    reduction = (1 - s_new / s_orig) * 100
    print(f" -> {dst_name}: {s_orig:.2f} MB -> {s_new:.2f} MB ({reduction:.1f}% reduction)")

print("\n=== COMPLETE ===")
print(f"Total Original: {total_orig:.2f} MB")
print(f"Total Optimized: {total_new:.2f} MB")
print(f"Total Saved: {total_orig - total_new:.2f} MB ({(1 - total_new / total_orig) * 100:.1f}% reduction)")

