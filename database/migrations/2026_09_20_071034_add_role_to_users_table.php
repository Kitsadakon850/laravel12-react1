public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        // กำหนดค่า default ให้ผู้สมัครใหม่ทุกคนเป็น 'employee'
        $table->string('role')->default('employee')->after('email'); 
    });
}

public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn('role');
    });
}