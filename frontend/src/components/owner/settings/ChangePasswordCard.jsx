import { useEffect, useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  LoaderCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import SettingsCard from "./SettingsCard";
import { updatePassword } from "../../../redux/thunks/settingThunk.js";
import { resetSettingLoadState } from "../../../redux/features/owner/settingLoadSlice.js";

export default function ChangePasswordCard() {
  const dispatch = useDispatch();

  const { loading, success, error, reqtype } = useSelector(
    (state) => state.loadsetting
  );

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    CurrentPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  useEffect(() => {
    if (reqtype !== "updatePassword") return;

    if (success) {
      toast.success("Password updated successfully.");

      setFormData({
        CurrentPassword: "",
        NewPassword: "",
        ConfirmPassword: "",
      });

      dispatch(resetSettingLoadState());
    }

    if (error) {
      toast.error(error);
      dispatch(resetSettingLoadState());
    }
  }, [success, error, reqtype, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    if (!formData.CurrentPassword.trim()) {
      return toast.error("Current password is required.");
    }

    if (!formData.NewPassword.trim()) {
      return toast.error("New password is required.");
    }

    if (!formData.ConfirmPassword.trim()) {
      return toast.error("Confirm password is required.");
    }

    if (formData.NewPassword !== formData.ConfirmPassword) {
      return toast.error("Confirm password does not match.");
    }

    if (formData.CurrentPassword === formData.NewPassword) {
      return toast.error(
        "New password must be different from current password."
      );
    }

    dispatch(
      updatePassword({
        CurrentPassword: formData.CurrentPassword,
        NewPassword: formData.NewPassword,
      })
    );
  };

  return (
    <SettingsCard
      title="Security"
      icon={<ShieldCheck className="text-orange-500" size={22} />}
    >
      <div className="grid md:grid-cols-3 gap-6">
        <PasswordInput
          label="Current Password"
          name="CurrentPassword"
          value={formData.CurrentPassword}
          show={showCurrent}
          setShow={setShowCurrent}
          onChange={handleChange}
        />

        <PasswordInput
          label="New Password"
          name="NewPassword"
          value={formData.NewPassword}
          show={showNew}
          setShow={setShowNew}
          onChange={handleChange}
        />

        <PasswordInput
          label="Confirm Password"
          name="ConfirmPassword"
          value={formData.ConfirmPassword}
          show={showConfirm}
          setShow={setShowConfirm}
          onChange={handleChange}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleUpdate}
          disabled={loading && reqtype === "updatePassword"}
          className="min-w-[190px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && reqtype === "updatePassword" ? (
            <>
              <LoaderCircle size={18} className="animate-spin" />
              Updating...
            </>
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </SettingsCard>
  );
}

function PasswordInput({
  label,
  name,
  value,
  show,
  setShow,
  onChange,
}) {
  return (
    <div>
      <label className="block mb-2 text-sm text-zinc-400">
        {label}
      </label>

      <div className="relative">
        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label}
          className="w-full pl-11 pr-12 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white outline-none focus:border-orange-500 transition"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-orange-500"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}